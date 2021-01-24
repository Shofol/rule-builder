import React, { useState, useRef, useEffect, Fragment } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background } from 'react-flow-renderer';

import Sidebar from './Sidebar';
import PropertySidebar from './PropertySidebar';
import List from './List';

import './Pipeline.css';
// { id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }
const initialElements = [];
const initialElementsToExport = { nodes: [], edges: [] }


let id = 0;
const getId = () => `pipelineNode_${id++}`;

const Pipeline = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);
  const [elementsToExport, setelementsToExport] = useState(initialElementsToExport);
  const [downloading, setDownloading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [pipelineName, setPipelineName] = useState('');
  const [existingListToExport, setExistingListToExport] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
    handleEdgeConnect(params);
  };

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);


  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };


  const onDrop = (event) => {
    event.preventDefault();
    setSelectedNode(null);
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/nodeType');
    const label = event.dataTransfer.getData('application/label');
    const props = event.dataTransfer.getData('application/props');

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: elements.length > 0 ? `pipelineNode_${elements.length}` : getId(),
      type,
      position,
      data: { label: `${label} node`, props: props, properties: [] },
    };
    setElements((es) => es.concat(newNode));
  };

  const updateNode = (updatedList) => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNode.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            props: JSON.stringify(updatedList),
            properties: updatedList.map(
              prop => ({ name: prop.label.split(' ').join('').toLowerCase(), value: prop.value })
            ),
          };
        }
        return el;
      })
    );
    setSelectedNode(null);

  }

  useEffect(() => {
    if (elements.length > 1 && !selectedPipeline) {

      setElements((els) => addEdge({
        source: 'pipelineNode_0',
        target: 'pipelineNode_1',
        sourceHandle: null,
        targetHandle: null
      }, els));

    }

  }, [elements]);

  // const tempElementsToExport = { ...elementsToExport };
  //   tempElementsToExport.nodes = [...elements];
  //   setelementsToExport(tempElementsToExport);

  const handleEdgeConnect = (els) => {
    const tempElementsToExport = { ...elementsToExport };
    tempElementsToExport.edges = [...tempElementsToExport.edges, els];
    setelementsToExport(tempElementsToExport);
  }

  useEffect(() => {
    if (downloading) {
      setTimeout(() => {
        download(JSON.stringify(elementsToExport), 'pipeline.json', 'application/json');
        setDownloading(false);
      }, 100);
    }
  }, [elementsToExport]);

  const handleDownload = () => {
    setDownloading(true);
    const tempElementsToExport = { id: existingListToExport.id, name: existingListToExport.name, elements: elementsToExport };
    tempElementsToExport.elements.nodes = [...elements];
    setelementsToExport(tempElementsToExport);
  }

  const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  // download(JSON.stringify(elements), 'json.txt', 'application/json');

  const createPipeLine = () => {
    reset();
    // setElements([]);
    // setelementsToExport([]);
    // setSelectedNode(null);
  }

  const savePipeLine = () => {
    let existingList = localStorage.getItem('pipelineList');
    if (existingList) {
      if (selectedPipeline) {
        const tempList = [...JSON.parse(existingList)];
        tempList.filter(list => list.id === selectedPipeline.id)[0].name = pipelineName;
        tempList.filter(list => list.id === selectedPipeline.id)[0].elements = elements;
        existingList = tempList;
      } else {
        existingList = [...JSON.parse(existingList), { id: existingList.length + 1, name: pipelineName, elements: elements }];
      }
    } else {
      existingList = [{ id: 1, name: pipelineName, elements: elements }];
    }

    localStorage.removeItem('pipelineList');
    localStorage.setItem('pipelineList', JSON.stringify(existingList));
    alert('Pipeline Saved');


    let existingListToExport = localStorage.getItem('pipelineListToExport');
    if (existingListToExport) {
      existingListToExport = [...JSON.parse(existingListToExport), { id: existingList.length + 1, name: pipelineName, elementsToExport: elementsToExport }];
    } else {
      existingListToExport = [{ id: 1, name: pipelineName, elementsToExport: elementsToExport }];
    }

    localStorage.removeItem('pipelineListToExport');
    localStorage.setItem('pipelineListToExport', JSON.stringify(existingListToExport));
    reset();

  }

  const renderPipeline = (pipeline, i) => {
    setElements([]);
    setSelectedPipeline(pipeline);
    setElements(pipeline.elements);
    setPipelineName(pipeline.name ? pipeline.name : `Pipeline${i + 1}`);
    let existingListToExport = localStorage.getItem('pipelineListToExport');
    if (existingListToExport) {
      setExistingListToExport(JSON.parse(existingListToExport)[i]);
      existingListToExport = JSON.parse(existingListToExport)[i].elementsToExport;
      setelementsToExport(existingListToExport);
    }

  }

  const handleList = () => {
    setShowList(!showList);
    setElements([]);
    setSelectedNode(null);
    setPipelineName('');

  }

  const reset = () => {
    setElements([]);
    setelementsToExport([]);
    setExistingListToExport([]);
    setSelectedNode(null);
    setShowList(false);
    setPipelineName('');
    setDownloading(false);
    setSelectedPipeline(null);
  }

  return (
    <Fragment>
      <nav className="navBar">
        <div style={{ width: '300px' }}>
          <input style={{ height: '40px', fontSize: '12px' }} value={pipelineName} placeholder='Pipeline Name' className="form-control" onChange={(e) => { setPipelineName(e.target.value) }}></input>
        </div>
        <div className="ms-auto">
          <button className="btn btn-sm btn-secondary" onClick={() => { handleList() }}><span>{showList ? 'Close ' : 'Show '}</span>List</button>
          <button className="btn btn-sm btn-secondary" onClick={createPipeLine}>New Pipeline</button>
          <button className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#confirmationModal" >Save Pipeline</button>
          <button className="btn btn-sm btn-secondary" onClick={reset}>Clear</button>
          <button className="btn btn-sm btn-secondary" onClick={handleDownload} >Export as JSON</button>
        </div>
      </nav>
      <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>

        <ReactFlowProvider>
          <Sidebar />
          <div style={{ width: '90vw', height: '100vh' }} className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onElementClick={(event, element) => setSelectedNode(element)}
            >
              <Background
                variant="dots"
                gap={12}
                size={1}
              />

            </ReactFlow>
          </div>
          {selectedNode &&
            <PropertySidebar
              propList={JSON.parse(selectedNode.data.props)}
              updateProp={(propList) => { updateNode(propList) }}
              download={() => { handleDownload(); }} />}
          {showList &&
            <List renderPipeline={(pipeline, i) => renderPipeline(pipeline, i)} />
          }
          <Controls />
        </ReactFlowProvider>
      </div>

      <div className="modal" tabIndex="-1" id="confirmationModal">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to save this pipeline?</p>
            </div>
            <div className="modal-footer py-2">
              <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={savePipeLine}>Save Pipeline</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Pipeline;