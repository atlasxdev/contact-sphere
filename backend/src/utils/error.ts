import { StatusCodes } from "http-status-codes";
import type { ZodError } from "zod";

type ErrorName =
    | "Unauthorized" // 401: The user is not authenticated
    | "Bad_Request" // 400: The request is malformed or invalid
    | "Forbidden" // 403: The user is authenticated but does not have access rights
    | "Not_Found" // 404: The requested resource could not be found
    | "Conflict" // 409: There is a conflict with the current state of the resource
    | "Unprocessable_Entity" // 422: The server understands the content type, but the request was invalid
    | "Too_Many_Requests" // 429: The user has sent too many requests in a given amount of time
    | "Internal_Server_Error" // 500: A generic error occurred on the server
    | "Bad_Gateway" // 502: The server was acting as a gateway or proxy and received an invalid response
    | "Service_Unavailable" // 503: The server is not ready to handle the request
    | "Gateway_Timeout"; // 504: The server was acting as a gateway or proxy and did not receive a response in time

export class BadRequestError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
        this.status = StatusCodes.BAD_REQUEST;
    }
}

export class UnauthorizedError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

export class ForbiddenError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
        this.status = StatusCodes.FORBIDDEN;
    }
}

export class NotFoundError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
        this.status = StatusCodes.NOT_FOUND;
    }
}

export class ConflictError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
        this.status = StatusCodes.CONFLICT;
    }
}

export class UnprocessableEntityError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "UnprocessableEntityError";
        this.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

export class TooManyRequestsError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "TooManyRequestsError";
        this.status = StatusCodes.TOO_MANY_REQUESTS;
    }
}

export class InternalServerError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "InternalServerError";
        this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export class BadGatewayError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "BadGatewayError";
        this.status = StatusCodes.BAD_GATEWAY;
    }
}

export class ServiceUnavailableError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "ServiceUnavailableError";
        this.status = StatusCodes.SERVICE_UNAVAILABLE;
    }
}

export class GatewayTimeoutError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "GatewayTimeoutError";
        this.status = StatusCodes.GATEWAY_TIMEOUT;
    }
}

export class ZodErrorResponse extends Error {
    status: number;
    errors: Array<{ path: string; message: string }>;

    constructor(error: ZodError) {
        const formattedErrors = error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        }));
        super("Validation Error");
        this.name = error.name;
        this.status = StatusCodes.UNPROCESSABLE_ENTITY;
        this.errors = formattedErrors;
    }
}

export function createErrorResponse<TError extends Error>(error: TError) {
    if (error instanceof ZodErrorResponse) {
        return {
            statusCode: error.status,
            error: {
                name: error.name,
                message: error.message,
                details: error.errors, // Include Zod-specific error details
            },
        };
    }

    console.log(error);

    if (error instanceof Error) {
        return {
            statusCode: (error as any).status,
            error: {
                name: error.name,
                message: error.message,
            },
        };
    }

    // Fallback for non-error objects
    return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: {
            name: "InternalServerError",
            message: "An unexpected error occurred",
        },
    };
}
