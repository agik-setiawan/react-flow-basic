import {
  Box,
  Button,
  Card,
  ColorInput,
  Flex,
  Group,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import {
  Background,
  Controls,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  EdgeProps,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeTypes,
} from "@xyflow/react";
import { useDisclosure } from "@mantine/hooks";
import "@xyflow/react/dist/style.css";
import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { EdgeAnimationCircle } from "./components/EdgeAnimationCircle";
import { EdgeAnimationArrow } from "./components/EdgeAnimationArrow";
import CustomNode1 from "./components/nodes/CustomNode1";

const initialNodes: Node[] = [
  //   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  //   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  //   { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
];

const initialEdges: Edge[] = [
  //   { id: "e1-2", source: "1", target: "2", animated: true },
];

const edgeTypes = {
  animatedCircle: EdgeAnimationCircle,
  animatedArrow: (props: EdgeProps) => (
    <EdgeAnimationArrow {...props} arrowCount={1} />
  ),
};

const nodeTypes: NodeTypes = {
  cardNode: CustomNode1,
};

function Flow() {
  const reactFlowInstance = useReactFlow();
  const flowWrapperRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleNewNodes = () => {
    if (!flowWrapperRef.current) return;

    const id = new Date().getTime().toString();

    // Get the current viewport
    const { x, y, zoom } = reactFlowInstance.getViewport();

    // Get the container's bounding rect
    const reactFlowBounds = flowWrapperRef.current.getBoundingClientRect();

    // Calculate center position in the current viewport
    const centerX = (reactFlowBounds.width / 2 - x) / zoom;
    const centerY = (reactFlowBounds.height / 2 - y) / zoom;

    const newNode: Node = {
      id,
      position: { x: centerX, y: centerY },
      data: { label: name, color: color },
      type: "cardNode",
    };

    setNodes((nds) => [...nds, newNode]);
    close();
  };

  useEffect(() => {
    console.log("nodes", nodes);
  }, [nodes]);

  const onConnect = useCallback((params: Connection) => {
    const edgeId = `e${params.source}-${params.target}`;
    const newEdge: Edge = {
      id: edgeId,
      source: params.source || "",
      target: params.target || "",
      type: "animatedArrow",
      animated: true,
    };
    setEdges((eds) => [...eds, newEdge]);
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered radius={'lg'}>
        <Stack>
          <TextInput
            label={"Task Name"}
            description={"add task name"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <ColorInput
            label="Color"
            description="Color task"
            placeholder="Change color"
            value={color} onChange={(e)=>{
              setColor(e)
            }}
          />
          <Button onClick={handleNewNodes}>Add Task</Button>
        </Stack>
      </Modal>

      <Flex>
        <div style={{ width: "70vw", height: "100vh" }} ref={flowWrapperRef}>
          <ReactFlow
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
        </div>
        <Card h={"100vh"} w={"30vw"} bg={"gray.2"}>
          <Group justify="end">
            <Box>
              <Button
                size="lg"
                onClick={() => {
                  setName("");
                  open();
                }}
              >
                Add Task
              </Button>
            </Box>
            <Box>
              <Button size="lg">Back</Button>
            </Box>
          </Group>
        </Card>
      </Flex>
    </>
  );
}

// Wrap with ReactFlowProvider to have access to useReactFlow hook
export default function MyFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
