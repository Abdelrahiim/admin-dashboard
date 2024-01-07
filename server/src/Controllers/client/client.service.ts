import { NotFoundException } from "../../HttpExceptions";

// @ts-ignore
import getCountryISO3 from "country-iso-2-to-3";
import { Product, ProductStat, User, Transactions } from "../../Models";
// for formatting sorting
interface SortFormat {
  [key: string]: "desc" | "asc";
}

/**
 * Client Service Responsible For all Business Logic
 * For client Module as i like to call it heavily inspired
 * by nest js
 */
class ClientService {
  /**
   * Fetch Product Data from the db
   * add stats to them in the worst way possible
   * because of the Bad data modeling
   * @returns List of Products
   */
  public async getProducts() {
    try {
      // relations in mongo db is not ideal but still much better that what i was doing before
      const productsWithStats = await Product.aggregate([
        {
          $lookup: {
            from: "product-stat",
            localField: "_id",
            foreignField: "productId",
            as: "stat",
          },
        },
      ]);

      return productsWithStats;
    } catch (e: unknown) {
      throw new NotFoundException("Not Found");
    }
  }
  /**
   *
   * @returns return all users in db that has role === "user"
   */
  public async getNonAdminUsers() {
    try {
      const users = await User.find({
        role: "user",
      }).select("-password");
      return users;
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }
  /**
   *
   * @returns return all users in db that has role === "user"
   */
  public async getAdminUsers() {
    try {
      const users = await User.find({
        role: "admin" || "superadmin",
      }).select("-password");
      return users;
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }

  /**
   * Return all transaction from body
   * and adding some mods like pagination
   */
  public async getAllTransactions(
    page: number,
    pageSize: number,
    search: string,
    sort?: string
  ) {
    const sortedFormatted = sort ? this.generateSort(sort as string) : {};
    const transactions = await Transactions.find({
      $or: [
        {
          cost: { $regex: new RegExp(search, "i") },
        },
        {
          useId: { $regex: new RegExp(search, "i") },
        },
      ],
    })
      .sort(sortedFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    const total = await Transactions.countDocuments({
      cost: { $regex: search, $options: "i" },
    });
    console.log({ total });

    return { total, transactions };
  }
  /**
   * Return all user group by country
   * and The Count it is like
   * * SELECT count(id) as count , country FROM user
   * * Group by county ;
   * in SQL
   * but also format the country code for 2 character to 3
   * @returns the new codes in this format
   * {id:"NIC",count:1}
   */
  public async getAllGeography() {
    /**
     * mongo aggregate
     * ! remember to read more about it
     */
    try {
      const codes = await User.aggregate([
        {
          $group: {
            _id: "$country",
            count: { $sum: 1 },
          },
        },
      ]);

      const newCodes = codes.map((code): { id: string; value: number } => {
        return { id: getCountryISO3(code._id), value: code.count };
      });
      return newCodes;
    } catch (e) {
      throw new NotFoundException("Not Found");
    }
  }
  /**
   * return a formatted object the is suitable for mongodb
   * @param sort
   * @returns
   */
  private generateSort(sort: string) {
    const sortedParsed: { field: string; sort: string } = JSON.parse(sort);
    const sortFormatted: SortFormat = {
      [sortedParsed.field]: sortedParsed.sort == "asc" ? "asc" : "desc",
    };
    return sortFormatted;
  }
}

export const clientService = new ClientService();
