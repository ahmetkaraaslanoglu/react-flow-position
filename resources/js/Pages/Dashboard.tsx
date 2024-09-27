import { ReactFlow, Controls, Background, ReactFlowProvider, useViewport } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import '@xyflow/react/dist/style.css';
import {PageProps} from "@/types";

function Flow() {
    const flowRef = useRef<HTMLDivElement>(null);
    const { x: viewportX, y: viewportY, zoom } = useViewport();

    useEffect(() => {
        const handleRightClick = (event: MouseEvent) => {
            event.preventDefault();

            const { clientX, clientY } = event;

            const flowBounds = flowRef.current?.getBoundingClientRect();
            if (flowBounds) {
                const positionInFlow = {
                    x: (clientX - flowBounds.left - viewportX) / zoom,
                    y: (clientY - flowBounds.top - viewportY) / zoom,
                };

                console.log(`ReactFlow üzerinde sağ tık. X: ${positionInFlow.x}, Y: ${positionInFlow.y}`);
            }
        };

        const flowElement = flowRef.current;
        if (flowElement) {
            flowElement.addEventListener('contextmenu', handleRightClick);
        }

        return () => {
            if (flowElement) {
                flowElement.removeEventListener('contextmenu', handleRightClick);
            }
        };
    }, [viewportX, viewportY, zoom]);

    return (
        <div ref={flowRef} className="w-full h-full">
            <ReactFlow>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default function Dashboard({ auth }: PageProps) {
    return (
        <div className="w-full h-screen bg-gray-800">
            <ReactFlowProvider>
                <Flow />
            </ReactFlowProvider>
        </div>
    );
}
