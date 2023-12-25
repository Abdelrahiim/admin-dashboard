import { error } from "console";
import { NotFoundException } from "../../HttpExceptions";
import { User } from "../../Models";

export class GeneralService {
  public async findUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundException("Not");
    }
    return user;
  }
}

export const generalService = new GeneralService();
