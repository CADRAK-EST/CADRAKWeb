export const parseDXFJson = (jsonData) => {
    const metadata = jsonData.metadata;
    const boundingBox = jsonData.bounding_box;
    const views = jsonData.views || [];
    const informationBoxes = jsonData.info_boxes || [];

    console.log('Parsed DXF JSON:', { metadata, boundingBox, views, informationBoxes });
    return { metadata, boundingBox, views, informationBoxes };
};
