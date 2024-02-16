import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const TableHanso = ({posts}) => {  

  return (
    <HotTable
      data={posts}
      dataSchema={{
        title: null,
        content: null        
      }}
      height="auto"
      width="auto"
      startRows={10}
      startCols={10}
      colHeaders={['Title de olivo', 'Content']}
      columns={[
        { data: 'title' },
        { data: 'content' },
        
      ]}
      minSpareRows={1}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};