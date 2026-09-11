import {
  StatusCritical,
  StatusGood,
  StatusInfo,
  StatusWarning,
} from "@hpe-design/icons-grommet";
import { Box, Text } from "grommet";

type Status = "ok" | "warning" | "error" | "info";

const statusMap = {
  ok: {
    label: "Success",
    icon: <StatusGood aria-hidden="true" color="status-ok" />,
  },
  warning: {
    label: "Warning",
    icon: <StatusWarning aria-hidden="true" color="status-warning" />,
  },
  error: {
    label: "Failed",
    icon: <StatusCritical aria-hidden="true" color="status-critical" />,
  },
  info: {
    label: "Info",
    icon: <StatusInfo aria-hidden="true" color="text-weak" />,
  },
};

export function StatusIndicator({
  status,
  label,
}: {
  status: Status;
  label?: string;
}) {
  const { icon, label: defaultLabel } = statusMap[status];

  return (
    <Box direction="row" align="center" gap="3xsmall">
      {icon}
      <Text>{label ?? defaultLabel}</Text>
    </Box>
  );
}

export function AuditLogStatus({
  status,
}: {
  status: "success" | "warning" | "failed";
}) {
  const indicatorStatus: Status =
    status === "success"
      ? "ok"
      : status === "warning"
        ? "warning"
        : "error";

  return <StatusIndicator status={indicatorStatus} />;
}
