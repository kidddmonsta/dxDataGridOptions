function render(blockId) {
    prepareData().then(function () {
        $.getJSON('widgetOptions.json').then(function (widgetOptions) {
            settings = widgetOptions;
            console.log(widgetOptions);
            initNewGrid(filteredData, blockId);
            console.log(filteredData);
            var dataGrid = $(blockId).dxDataGrid({
                dataSource: filteredData,
                showColumnLines: settings.showColumnLines,
                showRowLines: settings.showRowLines,
                rowAlternationEnabled: settings.rowAlternationEnabled,
                columnHidingEnabled: settings.columnHidingEnabled,
                allowColumnReordering: settings.allowColumnReordering,
                allowColumnResizing: settings.allowColumnResizing,
                columnMinWidth: settings.columnMinWidth,
                columnAutoWidth: settings.columnAutoWidth,
                showBorders: settings.showBorders,
                export: {
                    enabled: settings.exportEnabled,
                    allowExportSelectedData: settings.exportAllowExportSelectedData
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('dxGridData');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        // https://github.com/exceljs/exceljs#writing-xlsx
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'dxGridData.xlsx');
                        });
                    });
                    e.cancel = true;
                },

                loadPanel: {
                    enabled: settings.loadPanelEnabled
                },
                columnChooser: {
                    enabled: settings.columnChooserEnabled
                },
                columnFixing: {
                    enabled: settings.columnFixingEnabled
                },
                grouping: {
                    autoExpandAll: settings.groupingAutoExpandAll,
                    contextMenuEnabled: settings.groupingContextMenuEnabled,
                    expandMode: settings.groupingExpandMode
                },
                searchPanel: {
                    visible: settings.searchPanelVisible,
                    highlightCaseSensitive: settings.searchPanelhighlightCaseSensitive,
                    width: settings.searchPanelWidth,
                    placeholder: settings.searchPanelPlaceholder
                },
                paging: {
                    pageSize: settings.pagingPageSize
                },
                groupPanel: {
                    visible: settings.groupPanelVisible,
                    emptyPanelText: settings.groupPanelEmptyPanelText,
                },
                pager: {
                    showPageSizeSelector: settings.pagerShowPageSizeSelector,
                    allowedPageSizes: settings.pagerAllowedPageSizes,
                    showInfo: settings.pagerShowInfo,
                    showNavigationButtons: settings.pagerShowNavigationButtons
                },
                filterRow: {
                    visible: settings.filterRowVisible,
                    applyFilter: settings.filterRowApplyFilter
                },
                headerFilter: {
                    visible: settings.headerFilterVisible,
                    allowSearch: settings.headerFilterAllowSearch
                },
                scrolling: {
                    mode: settings.scrollingMode
                },
                editing: {
                    mode: settings.editingMode,
                    allowAdding: settings.editingAllowAdding,
                    allowUpdating: settings.editingAllowUpdating,
                    allowDeleting: settings.editingAllowDeleting,
                    selectTextOnEditStart: settings.editingSelectTextOnEditStart,
                    useIcons: settings.editingUseIcons
                },
                selection: {
                    mode: settings.selectionMode,
                    deferred: settings.selectionDeferred
                },
                sorting: {
                    mode: settings.sortingMode
                },
                rowDragging: {
                    allowReordering: settings.rowDraggingAllowReordering,
                    onReorder: function (e) {
                        var visibleRows = e.component.getVisibleRows(),
                            toIndex = filteredData.indexOf(visibleRows[e.toIndex].data),
                            fromIndex = filteredData.indexOf(e.itemData);

                        filteredData.splice(fromIndex, 1);
                        filteredData.splice(toIndex, 0, e.itemData);

                        e.component.refresh();
                    }
                },
                stateStoring: {
                    enabled: settings.stateStoringEnabled,
                    type: settings.stateStoringType,
                    storageKey: settings.stateStoringStorageKey
                },
                hoverStateEnabled: settings.hoverStateEnabled,
                repaintChangesOnly: settings.repaintChangesOnly

                //columns: val.values
                /*columns: [
                    "time",
                    "duration",
                    "IK_hours",
                    "OC_hours",
                    {
                        dataField: "type_ois",
                        groupIndex: 0
                    }
                ]*/
            }).dxDataGrid("instance");




            /*$("#autoExpand").dxCheckBox({
                value: true,
                text: "Expand All Groups",
                onValueChanged: function (data) {
                    dataGrid.option("grouping.autoExpandAll", data.value);
                    console.log(data);
                }
            });*/
        });
    });
}