import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Avatar, Card, Flex, Text } from "@mantine/core";

const CustomNode1: React.FC<NodeProps> = ({ data, isConnectable }: any) => {
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Card withBorder radius={"lg"} p={10} bd={`${data.color??'gray'} 1px solid`}>
        <Flex gap={4} w={160} align={'center'}>
          <Avatar size={'sm'} />
          <Text size="sm">{data.label}</Text>
        </Flex>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(CustomNode1);
