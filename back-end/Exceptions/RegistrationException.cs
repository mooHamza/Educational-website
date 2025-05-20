using Microsoft.AspNetCore.Identity;

namespace Educational.Exceptions
{
    public class RegistrationException : Exception
    {
        public IEnumerable<IdentityError> Errors { get; }

        public RegistrationException(string message, IEnumerable<IdentityError> errors)
            : base(message)
        {
            Errors = errors;
        }
    }
}
