import { ObjectId } from "mongodb";

export function isObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}
