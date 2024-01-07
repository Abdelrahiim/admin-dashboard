import { Types } from "mongoose";
import { NotFoundException } from "../../HttpExceptions";
import { User, Transactions } from "../../Models";
import { UserWithStats } from "../../Interfaces/UserWithStats";

/**
 * Client Service Responsible For all Business Logic
 * For client Module as i like to call it heavily inspired
 * by nest js
 */
class ManagementService {
  /**
   *
   * @returns return all users in db that has role !== "user"
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

  public async getUserPerformanceById(id: string) {
    try {
      const userWithStats = await User.aggregate<UserWithStats>([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliate_stat",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats", // Optional alias for the joined data
          },
        },
        { $unwind: "$affiliateStats" },
      ]);

      if (
        userWithStats &&
        userWithStats.length > 0 &&
        userWithStats[0].affiliateStats &&
        userWithStats[0].affiliateStats.affiliateSales
      ) {
        // bad data modeling
        const saleTransactions = await Promise.all(
          userWithStats[0].affiliateStats.affiliateSales.map((id) => {
            return Transactions.findById(id);
          })
        );
        const filteredSaleTransactions = saleTransactions.filter(
          (transaction) => transaction !== null
        );

        const { password, affiliateStats, ...rest } = userWithStats[0];
        return { user: rest, sales: filteredSaleTransactions };
      }
      throw new NotFoundException("Not Found");

      // return userWithStats;
    } catch (e: any) {
      throw new NotFoundException(e.message);
    }
  }
}

export const managementService = new ManagementService();
