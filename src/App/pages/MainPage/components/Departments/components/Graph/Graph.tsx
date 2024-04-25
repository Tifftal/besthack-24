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
      color: randomColor(),
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
    size: 25,
  },
  height: '540px',
};

function randomColor() {
  const colors = [
    '#e04141',
    '#e09c41',
    '#e0df41',
    '#7be041',
    '#41e0c9',
    '#41bfe0',
    '#4171e0',
    '#7a41e0',
    '#e041b1',
    '#e04141',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export type GraphComponentProps = {
  changeDepartment: (department: string) => void;
};

const GraphComponent: React.FC<GraphComponentProps> = ({ changeDepartment }) => {
  const [graphState, setGraphState] = useState<graph>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    getDepartments().then((res) => {
      console.log(res);
      const graph = fromDepartmentToGraph(res);
      console.log(graph);
      setGraphState(graph);
      console.log(state)
    });
  }, []);

  useEffect(() => {
    console.log(graphState);
    setState({
      ...state,
      graph: graphState,
      counter: graphState.nodes.length,
    });
    console.log(state)
  }, [graphState]);

  //   const createNode = (x, y) => {
  //     const color = randomColor();
  //     setState(({ graph: { nodes, edges }, counter, ...rest }) => {
  //       const id = counter + 1;
  //       const from = Math.floor(Math.random() * (counter - 1)) + 1;
  //       return {
  //         graph: {
  //           nodes: [...nodes, { id, label: `Node ${id}`, color, x, y }],
  //           edges: [...edges, { from, to: id }],
  //         },
  //         counter: id,
  //         ...rest,
  //       };
  //     });
  //   };
  const [state, setState] = useState({
    counter: graphState.nodes.length,
    graph: graphState,
    events: {
      select: ({ nodes, edges }) => {
        // console.log('Selected nodes:');
        // console.log('Selected edges:');
        // console.log(edges);
        // alert('Selected node: ' + nodes);
        changeDepartment(nodes[0]);
      },
      //   doubleClick: ({ pointer: { canvas } }) => {
      //     createNode(canvas.x, canvas.y);
      //   },
    },
  });

  // const events =  {
  //   select: ({ nodes, edges }) => {
  //     // console.log('Selected nodes:');
  //     console.log(nodes);
  //     // console.log('Selected edges:');
  //     // console.log(edges);
  //     // alert('Selected node: ' + nodes);
  //     changeDepartment(nodes[0]);
  //   },
  //   //   doubleClick: ({ pointer: { canvas } }) => {
  //   //     createNode(canvas.x, canvas.y);
  //   //   },

  // };
  const { graph, events } = state;
  console.log(graph)
  if (graph.nodes.length == 0 || graph.edges.length == 0) {
    return null;
  } else {
    console.log(graph)
    return <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />;
  }
};

export default GraphComponent;
