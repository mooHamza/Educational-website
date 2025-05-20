namespace Educational.Exceptions
{
    public class EntityNotFoundException(string entityName, object key)
     : Exception($"Entity '{entityName}' with ID '{key}' was not found.")
    {
    }
}