import { ServiceSettings } from "./types"

class Settings {
  public userService: ServiceSettings = {
    host: "localhost",
    port: 8888,
  }

  public libraryService: ServiceSettings = {
    host: "localhost",
    port: 8060,
  }

  public ratingService: ServiceSettings = {
    host: "",
    port: 1111,
  }

  public reservationService: ServiceSettings = {
    host: "",
    port: 1111,
  }

  public gatewayService: ServiceSettings = {
    host: "localhost",
    port: 8080,
  }

  public defaultPageSize: number = 4;
}

const settings = new Settings();

export default settings;
