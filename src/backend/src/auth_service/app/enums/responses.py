from enum import Enum

from schemas.response import ErrorResponse, ValidationErrorResponse
from consts import DomainsEnum

class ResponseManageEnum(Enum):
  Health = {
    "description": "User server is ready to work",
    "content": {
      "application/octet-stream": {
        "example": ""
      }
    },
  }

class ApiResponses:
  def get_all(domain_name: DomainsEnum):
    return {
      "description": f"All {domain_name.value}",
    }
    
  def get_by_uuid(domain_name: DomainsEnum):
    return {
      "description": f"{domain_name.value} by uuid",
    }
    
  def create(domain_name: DomainsEnum):
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
    
  def patch(domain_name: DomainsEnum):
    return {
      "description": f"{domain_name.value} by uuid was updated",
    }
    
  def delete(domain_name: DomainsEnum):
    return {
      "description": f"{domain_name.value} by uuid was removed",
      "content": {
        "application/octet-stream": {
          "example": ""
        }
      },
    }
    
  def invalid_data(domain_name: DomainsEnum):
    return {
      "model": ValidationErrorResponse,
      "description": f"Invalid data for {domain_name.value} entity",
    }
    
  def not_found(domain_name: DomainsEnum):
    return {
      "model": ErrorResponse,
      "description": f"Not found {domain_name.value} by uuid",
    }
    
  def conflict(domain_name: DomainsEnum):
    return {
      "model": ErrorResponse,
      "description": f"Conflict for {domain_name.value} entity",
    }
