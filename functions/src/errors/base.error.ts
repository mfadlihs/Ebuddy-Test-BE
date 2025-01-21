/**
 * @description Interface to define the structure of detailed error content.
 *
 * @property message - A Readable error message that explains the issue.
 * @property code - code for the error, useful for categorizing errors.
 * @property details - Additional information about the error
 */
export interface BaseErrorContent {
  message: string;
  code: string;
  details?: string;
}

/**
 * @extends Error
 *
 * @description Abstract base class for defining custom base application errors.
 *
 * @property status - Indicating the type of response, always set to 'error'
 * @property statusCode - The HTTP status code associated with the error (e.g., 400, 404, 500).
 * @property errors - An array of `BaseErrorContent` objects containing detailed error information.
 * @property timestamp - (Optional) A Date object indicating when the error occurred.
 * @property path - (Optional) The endpoint or route where the error occurred.
 *
 * @constructor
 * @param message - A brief description of the error passed to the parent `Error` class.
 */
export class BaseError extends Error {
  /**
   * Type of response, always set to 'error
   */
  readonly status: 'error' = 'error';

  /**
   * The HTTP status code associated with the error (e.g., 400, 404, 500).
   */
  readonly statusCode: number;

  /**
   * An array of `BaseErrorContent` objects containing detailed error information.
   */
  readonly errors: BaseErrorContent[];

  /**
   * A Date object indicating when the error occurred.
   */
  readonly timestamp: Date;

  /**
   * The endpoint or route where the error occurred.
   */
  readonly path?: string;

  constructor(params: {
    statusCode?: number;
    message?: string;
    errors?: BaseErrorContent[];
    timestamp?: Date;
    path?: string;
  }) {
    super(params.message);

    // Initialize value
    this.statusCode = params.statusCode ?? 500;
    this.errors = params.errors ?? [];
    this.timestamp = params.timestamp = new Date();
    this.path = params.path;

    // Ensures the prototype chain is correctly set for inheritance from the built-in Error class.
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
