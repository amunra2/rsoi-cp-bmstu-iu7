def escape_like(text: str) -> str:
  return text.replace("%", "\\%").replace("\\", "\\\\").replace("_", "\\_")

def ilike_search(text: str) -> str:
  return "%" + text + "%";
