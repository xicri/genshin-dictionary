import allTags from "../../public/dataset/tags.json";
import type { TagID } from "@/types";

/**
 * Validate string if it is a tag ID
 * @param {string} str - A string to validate if it is a tag ID
 * @returns {TagID} the given string as TagID type, or undefined if it is not TagID.
 */
export const validateTag = (str: string): TagID => {
  if (Object.keys(allTags).includes(str)) {
    return str as TagID;
  } else {
    throw TypeError("UNEXPECTED_TAG");
  }
};
