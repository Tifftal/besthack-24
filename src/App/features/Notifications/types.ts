import { MessagePayload } from "firebase/messaging";
import { ReactElement } from "react";

export interface NotificationPayloadProps {
    data?: MessagePayload | undefined;
    open: boolean;
};

export interface Props {
    children: ReactElement<any, any>;
};
