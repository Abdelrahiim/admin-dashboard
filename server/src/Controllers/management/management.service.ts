import { NotFoundException } from "../../HttpExceptions";
import { User } from "../../Models";

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
}

export const managementService = new ManagementService();
