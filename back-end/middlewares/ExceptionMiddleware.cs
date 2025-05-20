using Educational.Exceptions;

public class ExceptionMiddleware(RequestDelegate _next, ILogger<ExceptionMiddleware> _logger)
{

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context); // 🔹 Pass request to next middleware/controller
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled Exception");

            var response = context.Response;
            response.ContentType = "application/json";

            var statusCode = ex switch
            {
                EntityNotFoundException => StatusCodes.Status404NotFound, // Not Found
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized, // Unauthorized
                ArgumentException or ArgumentNullException or RegistrationException => StatusCodes.Status400BadRequest, // Bad Request
                ConflictException => StatusCodes.Status409Conflict,
                _ => StatusCodes.Status500InternalServerError // Internal Server Error (Default)
            };

            response.StatusCode = statusCode;

            var errorResponse = new
            {
                statusCode,
                message = ex.Message,
                detailedError = ex.InnerException?.Message 
            };

            await response.WriteAsJsonAsync(errorResponse);
        }
    }
}
