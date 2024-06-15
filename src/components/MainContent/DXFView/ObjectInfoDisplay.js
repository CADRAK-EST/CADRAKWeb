import React from 'react';

const ObjectInfoDisplay = ({ objectInfo }) => {
    return (
        <div className="object-info-display" style={styles.container}>
            {objectInfo ? (
                <pre style={styles.pre}>{JSON.stringify(objectInfo, null, 2)}</pre>
            ) : (
                <p style={styles.placeholder}>Click on an object to see details here</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '40px',
        right: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '300px',
        maxHeight: '400px',
        overflow: 'auto',
        zIndex: 1000,
    },
    pre: {
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '12px',
    },
    placeholder: {
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
    },
};

export default ObjectInfoDisplay;
