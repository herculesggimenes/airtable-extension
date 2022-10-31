import Airtable, { AirtableOptions } from "airtable";
import { airtableSettings } from "../airtableSettings";


export const airtableBase = new Airtable({
    apiKey:airtableSettings.API_KEY
}).base(airtableSettings.BASE_ID)
