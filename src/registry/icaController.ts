import type { Registry } from ".";
const registry = {
    "harpoon-4": {},
    "kaiyo-1": {
        "kujira1r36sc0ye7r5vywyc5cts6zyavfsfptaswn7gz9v2zqrlkwew0pzs03ulfa": {
            "address": "kujira1r36sc0ye7r5vywyc5cts6zyavfsfptaswn7gz9v2zqrlkwew0pzs03ulfa",
            "channel": {
                "endpoint": {
                    "port_id": "wasm.kujira1r36sc0ye7r5vywyc5cts6zyavfsfptaswn7gz9v2zqrlkwew0pzs03ulfa",
                    "channel_id": "channel-170"
                },
                "counterparty_endpoint": {
                    "port_id": "icahost",
                    "channel_id": "channel-917"
                },
                "order": "ORDER_ORDERED",
                "version": "{\"version\":\"ics27-1\",\"controller_connection_id\":\"connection-0\",\"host_connection_id\":\"connection-555\",\"address\":\"cosmos1dqj84u6maa72jvu2red9wj3pvjfh39qcpcxm5lmlx6989f94uyusl84d7q\",\"encoding\":\"proto3\",\"tx_type\":\"sdk_multi_msg\"}",
                "connection_id": "connection-0"
            },
            "channel_status": "STATE_OPEN"
        },
        "kujira1jkgud8kkvae4ppwzewtpt0nhz93jvh3xufz3v27e7qucpxrk3t0s2l8aft": {
            "address": "kujira1jkgud8kkvae4ppwzewtpt0nhz93jvh3xufz3v27e7qucpxrk3t0s2l8aft",
            "channel": {
                "endpoint": {
                    "port_id": "wasm.kujira1jkgud8kkvae4ppwzewtpt0nhz93jvh3xufz3v27e7qucpxrk3t0s2l8aft",
                    "channel_id": "channel-171"
                },
                "counterparty_endpoint": {
                    "port_id": "icahost",
                    "channel_id": "channel-916"
                },
                "order": "ORDER_ORDERED",
                "version": "{\"version\":\"ics27-1\",\"controller_connection_id\":\"connection-0\",\"host_connection_id\":\"connection-555\",\"address\":\"cosmos1r9pcuzd9nfqw5gpc6emxg0ulf4k8g7gdyjx0z8nam3w3zg7jc9nqwjdp8x\",\"encoding\":\"proto3\",\"tx_type\":\"sdk_multi_msg\"}",
                "connection_id": "connection-0"
            },
            "channel_status": "STATE_OPEN"
        }
    }
};
const typedRegistry: Registry<typeof registry> = registry;
export default typedRegistry;