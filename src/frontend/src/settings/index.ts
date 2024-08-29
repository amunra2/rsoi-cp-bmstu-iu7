import { ServiceSettings } from "./types"

class Settings {
  public userService: ServiceSettings = {
    host: "localhost",
    port: 8888,
  }

  public ratingService: ServiceSettings = {
    host: "",
    port: 1111,
  }

  public libraryService: ServiceSettings = {
    host: "",
    port: 1111,
  }

  public reservationService: ServiceSettings = {
    host: "",
    port: 1111,
  }

  public gatewayService: ServiceSettings = {
    host: "",
    port: 1111,
  }
}

const settings = new Settings();

export default settings;
