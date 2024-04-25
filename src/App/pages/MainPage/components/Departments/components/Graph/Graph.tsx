import Graph from 'react-graph-vis';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDepartments } from '../../../../../../api/department';
import { Department } from '../../../../MainPage';
import { groupEnd } from 'console';

function fromDepartmentToGraph(departments: Department[]): graph {
  const nodes = departments.map((department) => {
    return {
      id: department.id,
      label: department.name.length > 10 ? department.name.slice(0, 10) + '...' : department.name,
      color: 'dodgerblue',
    };
  });

  const edges = departments
    .map((department) => {
      if (!department.canSendTo) return [];
      return department.canSendTo.map((reciever) => {
        return {
          from: department.id,
          to: reciever.id,
        };
      });
    })
    .flat();

  return {
    nodes,
    edges,
  };
}
export type node = { id: string; label: string; color: string };

export type edge = { from: string; to: string };
type graph = {
  nodes: node[];
  edges: edge[];
};

const options = {
  layout: {
    hierarchical: {
      levelSeparation: 150,
      nodeSpacing: 100,
      blockShifting: true,
    },
  },
  edges: {
    color: '#000000',
  },
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    color: {
      border: '#000000',
      background: '#ffffff',
      highlight: {
        border: '#000000',
        background: '#ffffff',
      },
      hover: {
        border: '#000000',
        background: '#ffffff',
      },
    },
    opacity: 1,
    shape: 'dot',
    physics: false,
    size: 20,
  },
  height: '500px',
};

export type GraphComponentProps = {
  departments: Department[];
  changeDepartment: (department: string) => void;
};

const GraphComponent: React.FC<GraphComponentProps> = ({ departments, changeDepartment }) => {
  const [graphState, setGraphState] = useState<graph>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    const graph = fromDepartmentToGraph(departments);
    setGraphState(graph);
  }, [departments]);

  useEffect(() => {
    setState({
      ...state,
      graph: graphState,
      counter: graphState.nodes.length,
    });
  }, [graphState]);

  const [state, setState] = useState({
    counter: departments.length,
    graph: departments.length > 0 ? fromDepartmentToGraph(departments) : { nodes: [], edges: [] },
    events: {
      select: ({ nodes }) => {
        changeDepartment(nodes[0]);
      },
    },
  });

  const { graph, events } = state;
  if (graph.nodes.length == 0 || graph.edges.length == 0) {
    return null;
  } else {
    return <Graph graph={graph} options={options} events={events} style={{ height: '500px', border: '1px solid black' }} />;
  }
};

export default GraphComponent;
