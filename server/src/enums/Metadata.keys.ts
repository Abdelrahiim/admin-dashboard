/**
 * Enum representing metadata keys used for decorators.
 */
export enum MetadataKeys {
  /**
   * Represents the HTTP method associated with a route or method.
   * For example, "GET", "POST", etc.
   */
  Method = "method",

  /**
   * Represents the path associated with a route or method.
   * Specifies the URI path for the associated route.
   */
  Path = "path",
  /**
   * Represent the Middleware To Be add to a Specific Route
   */
  Middleware = "middleware",

  /**
   * Represent Applying Validate Request Middleware
   */
  Validator = "validator",
}
