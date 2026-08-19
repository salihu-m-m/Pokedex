import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;
  constructor(interval: number) {
  this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cachedUrl = this.cache.get<ShallowLocations>(url);
    if (cachedUrl){
      return cachedUrl
    }
  
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
}         const data : ShallowLocations = await response.json()
        this.cache.add(url, data);
        return data
    }catch (error){
        throw new Error(`Error fetching locations: ${(error as Error).message}`) 
    }}
  

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cachedUrl = this.cache.get<Location>(url)
    if (cachedUrl){
      return cachedUrl
    }
      try{
        const response = await fetch(url)
        if(!response.ok){
              throw new Error(`${response.status} ${response.statusText}`)
              }
               const data : Location = await response.json()
              this.cache.add(url, data)
              return data
        }catch(error){
           throw new Error(`Error fetching locations: ${(error as Error).message}`)
              }
      }
  }

export type ShallowLocations = {
    count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  location: {
    name: string;
    url: string;
  };
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};