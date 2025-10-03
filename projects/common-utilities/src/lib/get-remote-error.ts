import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts and formats error messages from HTTP responses or other error objects
 * @param error - The error object to process
 * @param defaultMessage - Custom default message (optional)
 * @returns Formatted error message string
 */
export const getRemoteErrorMessage = (
  error: HttpErrorResponse | unknown,
  defaultMessage = 'An unexpected error occurred. Please try again.'
): string => {
  if (!error) {
    return defaultMessage;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof HttpErrorResponse) {
    return extractFromHttpError(error, defaultMessage);
  }

  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const errorObj = error as { message: unknown };
    return formatErrorMessage(errorObj.message) || defaultMessage;
  }

  return defaultMessage;
};

const extractFromHttpError = (
  error: HttpErrorResponse,
  defaultMessage: string
): string => {
  const serverError = (error as HttpErrorResponse).error;
  if (typeof serverError === 'string') {
    return serverError || defaultMessage;
  }
  if (serverError && typeof serverError === 'object') {
    if ((serverError as { message?: unknown }).message) {
      return formatErrorMessage((serverError as { message?: unknown }).message);
    }
    if ((serverError as { error?: unknown }).error) {
      return formatErrorMessage((serverError as { error?: unknown }).error);
    }
    if ((serverError as { detail?: unknown }).detail) {
      return formatErrorMessage((serverError as { detail?: unknown }).detail);
    }
    if (
      (serverError as { errors?: unknown }).errors &&
      Array.isArray((serverError as { errors?: unknown }).errors)
    ) {
      const list = (serverError as { errors: unknown[] }).errors;
      return list
        .map((err) => {
          if (typeof err === 'string') {
            return err;
          }
          if (err && typeof err === 'object') {
            const e = err as { message?: unknown; msg?: unknown };
            return (
              formatErrorMessage(e.message) ||
              formatErrorMessage(e.msg) ||
              JSON.stringify(err)
            );
          }
          return String(err);
        })
        .filter((v): v is string => Boolean(v))
        .join(', ');
    }
  }
  return error.message || getHttpStatusMessage(error.status) || defaultMessage;
};

/**
 * Helper function to format different types of error messages
 */
const formatErrorMessage = (message: unknown): string => {
  if (!message) {
    return '';
  }

  if (typeof message === 'string') {
    return message;
  }

  if (Array.isArray(message)) {
    return message
      .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
      .filter(Boolean)
      .join(', ');
  }

  return String(message);
};

/**
 * Provides user-friendly messages for common HTTP status codes
 */
const getHttpStatusMessage = (status: number): string => {
  const messages: { [key: number]: string } = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please log in.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'A conflict occurred with the current state.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.'
  };

  return messages[status] || '';
};
