import { MongooseUserRepository } from "./implementations/MongooseUserRepository";

const userRepository = new MongooseUserRepository();

export { userRepository };