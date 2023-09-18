import type { IActivityHandler } from "@geocortex/workflow/runtime";
import { FMService } from "../FMService";
import { checkResponse } from "../request";

/** An interface that defines the inputs of the activity. */
interface CreateServiceInputs {
    /**
     * @displayName URL
     * @description The URL to the VertiGIS FM service.
     * @required
     */
    url: string;

    /**
     * @description The username of a VertiGIS FM user.
     */
    username: string;

    /**
     * @description The password of a VertiGIS FM user. Do not hard code passwords into workflows.
     */
    password: string;
}

/** An interface that defines the outputs of the activity. */
interface CreateServiceOutputs {
    /**
     * @description The VertiGIS FM service that can be used with other VertiGIS FM activities.
     */
    service: FMService;
}

/**
 * @displayName Create VertiGIS FM Service
 * @defaultName fmService
 * @category VertiGIS FM
 * @description Creates an authenticated connection to a VertiGIS FM service that can be used with other VertiGIS FM activities.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export default class CreateService implements IActivityHandler {
    async execute(inputs: CreateServiceInputs): Promise<CreateServiceOutputs> {
        const { password, url, username } = inputs;
        if (!url) {
            throw new Error("url is required");
        }

        // TODO: consider an option to use an existing session
        if (!username && !password) {
            throw new Error("username/password is required");
        }

        // Remove trailing slashes
        const normalizedUrl = url.replace(/\/*$/, "");

        const service: FMService = {
            url: normalizedUrl,
        };

        const response = await fetch(
            `${normalizedUrl}/Authentication_JSON_AppService.axd/Login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: username,
                    password,
                    createPersistentCookie: false,
                }),
            });

        await checkResponse(response);

        return {
            service,
        };
    }
}
