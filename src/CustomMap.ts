export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  getMarkerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map; // private modifier is used to restrict access to the googleMap property

  constructor(divId: string) {
    this.initMap(divId);
  }

  private async initMap(divId: string) {
    this.googleMap = await this.getMap(divId); // I had to do this because the constructor cannot be async
  }

  private async getMap(divId: string): Promise<google.maps.Map> {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    return new Map(document.getElementById(divId) as HTMLElement, {
      zoom: 1,
      center: { lat: 0, lng: 0 },
      mapId: 'DEMO_MAP_ID',
    });
  }

  // interface says that the object must have a location property (but can have other properties)
  async addMarker(mappable: Mappable) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color:${mappable.color}">
            ${mappable.getMarkerContent()}
          </div>
        `,
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
