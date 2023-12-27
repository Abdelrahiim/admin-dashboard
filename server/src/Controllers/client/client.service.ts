import { NotFoundException } from "../../HttpExceptions";
import { User } from "../../Models";
import { ProductStat } from "../../Models/product-stat.model";
import { Product } from "../../Models/product.model";

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
      const products = await Product.find();
      // this is the worse block of code i have ever done
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            // @ts-ignore
            ...product._doc,
            stat,
          };
        })
      );
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
}

export const clientService = new ClientService();
