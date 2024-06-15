import React from 'react';

const ViewToggle = ({ views, toggleView }) => {
    return (
        <div className="view-toggle" style={styles.container}>
            <h3 style={styles.title}>Views</h3>
            {views.map((view, index) => (
                <div key={index} style={styles.viewItem}>
                    <input
                        type="checkbox"
                        checked={view.visible}
                        onChange={() => toggleView(index)}
                        style={styles.checkbox}
                    />
                    <label style={styles.label}>{`View ${index + 1}`}</label>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '40px',
        right: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    viewItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    checkbox: {
        marginRight: '5px',
    },
    label: {
        fontSize: '14px',
    },
};

export default ViewToggle;
