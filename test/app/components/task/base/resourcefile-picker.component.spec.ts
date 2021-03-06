import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { EditableTableColumnComponent, EditableTableComponent } from "app/components/base/form/editable-table";
import { ResourcefilePickerComponent } from "app/components/task/base";

@Component({
    template: `<bl-resourcefile-picker [(ngModel)]="files"></bl-resourcefile-picker>`,
})
class TestComponent {
    public files = [];
}

describe("ResourcefilePickerComponent", () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let component: ResourcefilePickerComponent;
    let de: DebugElement;
    let editableTableEl: DebugElement;
    let editableTable: EditableTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ResourcefilePickerComponent, TestComponent,
                EditableTableComponent, EditableTableColumnComponent],
        });
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        de = fixture.debugElement.query(By.css("bl-resourcefile-picker"));
        editableTableEl = fixture.debugElement.query(By.css("bl-editable-table"));
        editableTable = editableTableEl.componentInstance;
        component = de.componentInstance;
        fixture.detectChanges();
    });

    it("should have the right column keys", () => {
        const columns = editableTable.columns.toArray();

        expect(columns.length).toBe(2);
        expect(columns[0].name).toBe("blobSource");
        expect(columns[1].name).toBe("filePath");
    });

    it("should have the right column labels", () => {
        const columns = editableTableEl.queryAll(By.css("thead th"));

        expect(columns.length).toBe(3);
        expect(columns[0].nativeElement.textContent).toContain("Blob source");
        expect(columns[1].nativeElement.textContent).toContain("File path");
    });

    it("Should update the files", () => {
        editableTable.addNewItem();
        editableTable.items.controls[0].setValue({
            blobSource: "https://example.com/file.json",
            filePath: "path/file.json",
        });
        expect(testComponent.files).toEqual([{
            blobSource: "https://example.com/file.json",
            filePath: "path/file.json",
        }]);
    });
});
