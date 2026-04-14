import React from 'react';
import '../styles/designer-tree.css';

const DesignerTree: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4">
            Designer Architecture
          </h2>
          <p className="text-lg lg:text-xl text-slate-600">
            Visual form designer package for creating forms, not for displaying them
          </p>
        </div>

        <div className="designer-tree">
          {/* Главный узел */}
          <div className="node main">@react-form-builder/designer</div>

          {/* Первый уровень */}
          <div className="row level-1">
            <div className="node" data-index="0">Drag & Drop form designer</div>
            <div className="node" data-index="1">Form settings</div>
            <div className="node" data-index="2">Component editors</div>
            <div className="node" data-index="3">Localization settings</div>
          </div>

          {/* Второй уровень */}
          <div className="row level-2">
            <div className="node" data-index="0">Property</div>
            <div className="node" data-index="1">Style</div>
            <div className="node" data-index="2">Validation</div>
            <div className="node" data-index="3">Action</div>
          </div>

          {/* SVG для прямых линий со скругленными углами */}
          <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Связи от главного узла к 4 элементам первого ряда */}
            <path d="M 50 20 L 50 35 L 25 35 L 25 45" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 20 L 50 35 L 37.5 35 L 37.5 45" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 20 L 50 35 L 62.5 35 L 62.5 45" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 20 L 50 35 L 75 35 L 75 45" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />

            {/* Связи от Component editors к 4 элементам второго ряда */}
            <path d="M 50 65 L 50 75 L 25 75 L 25 85" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 65 L 50 75 L 37.5 75 L 37.5 85" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 65 L 50 85" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
            <path d="M 50 65 L 50 75 L 62.5 75 L 62.5 85" stroke="white" strokeWidth="0.3" fill="none" className="connection-line" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DesignerTree; 