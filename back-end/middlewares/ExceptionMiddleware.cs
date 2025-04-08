public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

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
                KeyNotFoundException => StatusCodes.Status404NotFound, // Not Found
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized, // Unauthorized
                ArgumentException or ArgumentNullException => StatusCodes.Status400BadRequest, // Bad Request
                _ => StatusCodes.Status500InternalServerError // Internal Server Error (Default)
            };

            response.StatusCode = statusCode;

            var errorResponse = new
            {
                statusCode,
                message = ex.Message,
                detailedError = ex.InnerException?.Message // Include inner exception if available
            };

            await response.WriteAsJsonAsync(errorResponse);
        }
    }
}
