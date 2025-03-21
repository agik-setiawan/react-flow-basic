import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Avatar, Card, Flex, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const StartPoint: React.FC<NodeProps> = ({ data, isConnectable, onClick }: any) => {
  return (
    <div>
      <Card
        withBorder
        radius={"lg"}
        p={10}
        bd={`${data.color ?? "gray"} 1px solid`}
        style={{ cursor: "pointer" }}
      >
        <Flex gap={4} w={50} h={50} align={"center"} justify={"center"}>
          <Stack gap={0}>
            <ThemeIcon bg={'none'} c={'dimmed'}>
              <IconPlus />
            </ThemeIcon>
            <Text size="xs" c={'dimmed'}>{data.label}</Text>
          </Stack>
        </Flex>
      </Card>
    </div>
  );
};

export default memo(StartPoint);
