import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { FMService } from "../FMService";
import { httpRequest } from "../request";

/** An interface that defines the inputs of the activity. */
export interface SendRequestInputs {
    /**
     * @description The VertiGIS FM API Service.
     * @required
     */
    service: FMService;

    /**
     * @description The HTTP request method.
     * @required
     */
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    /**
     * @description The VertiGIS FM API resource or operation to request.
     * @required
     */
    path:
    | "OData/Devices/RepairType"
    | "OData/ServiceDesk/Status"
    | "OData/ServiceDesk/Ticket"
    | "OData/ServiceDesk/Type"
    | string;

    /**
     * @description The query string parameters to send on the request.
     */
    query?: {
        [key: string]: any;
    };

    /**
     * @description The body of the request.
     */
    body?: {
        [key: string]: any;
    };

    /**
     * @description The headers to send on the request.
     */
    headers?: {
        [key: string]: any;
    };
}

/** An interface that defines the outputs of the activity. */
interface SendRequestOutputs {
    /**
     * @description The result of the activity.
     */
    result: any;
}

/**
 * @category VertiGIS FM
 * @defaultName fmRequest
 * @displayName Send VertiGIS FM Request
 * @description Sends a request to the VertiGIS FM API.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export default class SendRequest implements IActivityHandler {
    async execute(
        inputs: SendRequestInputs
    ): Promise<SendRequestOutputs> {
        const { body, headers, method, path, query, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!method) {
            throw new Error("method is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        const response = await httpRequest(
            service,
            method,
            path,
            query,
            body,
            headers
        );

        return {
            result: response,
        };
    }
}
