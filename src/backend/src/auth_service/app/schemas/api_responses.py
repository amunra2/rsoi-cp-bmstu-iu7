from pydantic import BaseModel, ConfigDict

from utils.enums import DomainEnum

class ApiResponses:
  def get_all(domain_name: DomainEnum):
    return {
      "description": f"All {domain_name.value}",
    }
    
  def get_by_uuid(domain_name: DomainEnum):
    return {
      "description": f"{domain_name.value} by uuid",
    }
    
  def create(domain_name: DomainEnum):
    return {
      "description": f"Created new {domain_name.value}",
      "headers": {
        "Location": {
          "description": f"Path to new {domain_name.value}",
          "style": "simple",
          "schema": {
            "type": "string"
          }
        }
      },
      "content": {
        "application/octet-stream": {
          "example": ""
        }
      },
    }
    
  def patch(domain_name: DomainEnum):
    return {
      "description": f"{domain_name.value} by uuid was updated",
    }
    
  def delete(domain_name: DomainEnum):
    return {
      "description": f"{domain_name.value} by uuid was removed",
      "content": {
        "application/octet-stream": {
          "example": ""
        }
      },
    }
    
  def invalid_data(domain_name: DomainEnum):
    return {
      "model": ValidationErrorResponse,
      "description": f"Invalid data for {domain_name.value} entity",
    }
    
  def not_found(domain_name: DomainEnum):
    return {
      "model": ErrorResponse,
      "description": f"Not found {domain_name.value} by uuid",
    }
    
  def conflict(domain_name: DomainEnum):
    return {
      "model": ErrorResponse,
      "description": f"Conflict for {domain_name.value} entity",
    }
    
  def health(domain_name: DomainEnum):
    return {
      "description": f"{domain_name.value} server is ready to work",
      "content": {
        "application/octet-stream": {
          "example": ""
        }
      },
    }
    
class ErrorResponse(BaseModel):
  model_config = ConfigDict(
    json_schema_extra = {
      "example": {
        "message": "Method: exception description"
      },
    }
  )

class ValidationErrorResponse(BaseModel):
  model_config = ConfigDict(
    json_schema_extra = {
      "example": {
        "message": "Invalid request",
        "errors": [
          {
            "type": "type of error",
            "msg": "error message",
            "loc": "error location"
          }
        ]
      }
    }
  )
