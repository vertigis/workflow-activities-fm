import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FMService } from "../FMService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
interface GetODataEntityInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

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
        | string;

    /**
     * @description The OData entity ID.
     * @required
     */
    id: string | number;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
}

/** An interface that defines the outputs of the activity. */
interface GetODataEntityOutputs {
    /**
     * @description The OData entity result.
     */
    result: {
        "odata.metadata": string;
        "odata.id": string;
        [key: string]: any;
    };
}

/**
 * @displayName Get VertiGIS FM OData Entity
 * @defaultName fmODataEntity
 * @category VertiGIS FM
 * @description Sends an OData request to VertiGIS FM to fetch a single entity.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export default class GetODataEntity implements IActivityHandler {
    async execute(
        inputs: GetODataEntityInputs,
    ): Promise<GetODataEntityOutputs> {
        const { id, path, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (id === undefined || id === null) {
            throw new Error("id is required");
        }

        const delimiter = typeof id === "string" ? "'" : "";

        const response = await get(
            service,
            `${path}(${delimiter}${id}${delimiter})`,
        );

        return {
            result: response,
        };
    }
}
