import type { IActivityHandler } from "@geocortex/workflow/runtime";
import { FMService } from "../FMService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
interface GetODataCollectionInputs {
    /**
     * @description The VertiGIS FM Service.
     * @required
     */
    service: FMService;

    /**
     * @description The path to the resource.
     * @required
     */
    path:
    | "OData/Devices/AssetState"
    | "OData/Devices/Device"
    | "OData/Devices/Equipment"
    | "OData/Devices/MaintenableObjectType"
    | "OData/Devices/Order"
    | "OData/Devices/RepairType"
    | "OData/Devices/ServiceLevel"
    | "OData/Devices/Trade"
    | "OData/Facility/Document"
    | "OData/Facility/FaultNoteType"
    | "OData/Facility/MaintenableObject/Bmm.Equi.Equipment"
    | "OData/Facility/MaintenableObject/GeoMan.Facilities.FacilityObject"
    | "OData/Facility/FacilityObjectOrder"
    | "OData/Facility/Person"
    | "OData/ServiceDesk/Status"
    | "OData/ServiceDesk/Ticket"
    | "OData/ServiceDesk/Type"
    | "ODataList/Contracts/Contract"
    | string;

    /**
     * @description The OData filter to apply to the collection of resources.
     */
    filter?: string;

    /**
     * @description The OData related resources to be included in line with the retrieved resources.
     */
    expand?: string;

    /**
     * @description The order to sort the retrieved resources.
     */
    orderBy?: string;

    /**
     * @description The number of items to return.
     */
    top?: string;

    /**
     * @description The number of items to skip.
     */
    skip?: string;
}

/** An interface that defines the outputs of the activity. */
interface GetODataCollectionOutputs {
    /**
     * @description The OData collection result.
     */
    result: {
        "odata.metadata": string;
        value: {
            "odata.id": string;
            [key: string]: any;
        }[]
    };
}

/**
 * @displayName Get VertiGIS FM OData Collection
 * @defaultName fmOData
 * @category VertiGIS FM
 * @description Sends an OData request to VertiGIS FM to fetch a list of entities.
 * @clientOnly
 * @unsupportedApps GMV
 */
export default class GetODataCollection implements IActivityHandler {
    async execute(inputs: GetODataCollectionInputs): Promise<GetODataCollectionOutputs> {
        const { expand, filter, orderBy, path, service, skip, top } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        const response = await get(service, `${path}`, {
            ...(expand ? { "$expand": expand } : undefined),
            ...(filter ? { "$filter": filter } : undefined),
            ...(orderBy ? { "$orderby": orderBy } : undefined),
            ...(skip ? { "$skip": skip } : undefined),
            ...(top ? { "$top": top } : undefined),
        });

        return {
            result: response,
        };
    }
}
