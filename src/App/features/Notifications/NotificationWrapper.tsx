import { useEffect, useState } from "react";
import { NotificationPayloadProps, Props } from "./types";
import { getFirebaseToken, messaging } from "../../config/firebase/firebaseConfig";
import { MessagePayload, onMessage } from "firebase/messaging";
import { Notification } from "@mantine/core";

import styles from "./styles.module.scss";
import { getNotificationColor } from "../../helpers/getNotificationColor";

// eslint-disable-next-line react/prop-types
const NotificationWrapper: React.FC<Props> = ({ children }) => {
    const [notificationPayload, setNotificationPayload] = useState<NotificationPayloadProps[]>([]);

    useEffect(() => {
        const onMessageListener = async () => {
            const messagingResolve = await messaging;

            if (messagingResolve) {
                onMessage(messagingResolve, (payload: MessagePayload) => {
                    setNotificationPayload((prevNotifications) => [
                        ...prevNotifications,
                        { data: payload, open: true }
                    ]);

                    setTimeout(() => {
                        setNotificationPayload((prevNotifications) =>
                            prevNotifications.filter(
                                (_, index) => index !== prevNotifications.length - 1
                            )
                        );
                    }, 6000);
                });
            }
        };

        const handleGetFirebaseToken = () => {
            getFirebaseToken().then((firebaseToken: string | undefined) => {
                // todo: Add storing firebase token
                if (firebaseToken) {
                    // console.log(firebaseToken);
                }
            });
        };

        if ("Notification" in window && window.Notification?.permission === "granted") {
            handleGetFirebaseToken();
            onMessageListener();
        }
    }, []);

    return (
        <>
            <div className={styles['push-wrapper']}>
                {notificationPayload.map((notification, index) => (
                    <div className={styles.push} key={index}>
                        <Notification
                            onClose={() => {
                                setNotificationPayload((prevNotifications) =>
                                    prevNotifications.filter((_, i) => i !== index)
                                );
                            }}
                            title={notification?.data?.notification?.title || ""}
                            {...getNotificationColor(notification?.data?.notification?.title)}
                        >
                            {notification?.data?.notification?.body || ""}
                            <div className={styles["push-progress-bar"]}>
                                <div className={styles["push-progress"]} />
                            </div>
                        </Notification>
                    </div>
                ))}
            </div>
            {children}
        </>
    );
};

export default NotificationWrapper;
