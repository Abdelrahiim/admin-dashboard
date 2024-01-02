import { error } from "console";
import { NotFoundException } from "../../HttpExceptions";
import { User } from "../../Models";

export class GeneralService {
  public async findUser(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new NotFoundException("Not Found");
    }
    return user;
  }
}

export const generalService = new GeneralService();
