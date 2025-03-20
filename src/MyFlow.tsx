import { Box, Button, Card, Flex } from "@mantine/core";
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
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useState, useRef, useEffect } from "react";

const initialNodes: Node[] = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
//   { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
];

const initialEdges: Edge[] = [
//   { id: "e1-2", source: "1", target: "2", animated: true },
];

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowInstance = useReactFlow();
  const flowWrapperRef = useRef<HTMLDivElement>(null);

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
      data: { label: id },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  useEffect(()=>{
    console.log('nodes',nodes);
  },[nodes])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params: Connection) => {
    const edgeId = `e${params.source}-${params.target}`;
    const newEdge: Edge = {
      id: edgeId,
      source: params.source || "",
      target: params.target || "",
      animated: true,
    };
    setEdges((eds) => [...eds, newEdge]);
  }, []);

  return (
    <Flex>
      <div style={{ width: "70vw", height: "100vh" }} ref={flowWrapperRef}>
        <ReactFlow
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
        <Box>
          <Button size="lg" onClick={handleNewNodes}>
            Add Task
          </Button>
        </Box>
      </Card>
    </Flex>
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
