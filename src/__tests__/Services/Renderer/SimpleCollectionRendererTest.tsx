import {mock} from "jest-mock-extended";
import {IAutoCollection} from "../../../AutoCollection/IAutoCollection";
import {AutoCollectionProps} from "../../../AutoCollection/AutoCollectionProps";
import {SimpleCollectionRenderer} from "../../../Services/Renderer/SimpleCollectionRenderer";
import * as React from "react";
import {DataManager} from "../../../Services/DataManager/DataManager";
import {EmptyComponent} from "../../../CollectionComponent/CollectionComponent";
import {AutoCollectionDefault} from "../../../Default/AutoCollectionDefault";

describe('SimpleCollectionRenderer', () => {

    function makeMockedAutoCollection(props: Partial<AutoCollectionProps> = {} as any, loading: boolean = false, error: any = null) {
        return mock<IAutoCollection>({
            getProps(): AutoCollectionProps {
                return props as any;
            },
            data(): DataManager {
                return mock<DataManager>();
            },
            isLoading(): boolean {
                return loading;
            },
            getError(): any {
                return error;
            }
        });
    }

    describe('Loading', () => {

        it('should render loading using options in default position (top)', function () {
            const renderLoading = () => <h1>Loading...</h1>;
            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {renderLoading: renderLoading}}
            }, true);
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const loadingComponent = rendered.props.children.props.children[0];
            expect(loadingComponent).toEqual(renderLoading());
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

        it('should render loading using default renderer', function () {

            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {}}
            }, true);
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const loadingComponent = rendered.props.children.props.children[0];
            expect(loadingComponent).toEqual(AutoCollectionDefault.renderLoading());
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

        it('should render loading in bottom', function () {
            const renderLoading = () => <h1>Loading...</h1>;
            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {renderLoading: renderLoading, loadingPosition: "bottom"}}
            }, true);
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const loadingComponent = rendered.props.children.props.children[2];
            expect(loadingComponent).toEqual(renderLoading());
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

    });

    describe('Error', () => {

        it('should render error using options in default position (top)', function () {
            const renderError = () => <h1>ERROR</h1>;
            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {renderError: renderError}}
            }, false, "ERROR");
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const errorComponent = rendered.props.children.props.children[1];
            expect(errorComponent).toEqual(renderError());
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

        it('should render loading using default renderer', function () {

            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {}}
            }, false, "ERROR");
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const loadingComponent = rendered.props.children.props.children[1];
            expect(loadingComponent).toEqual(AutoCollectionDefault.renderError("ERROR"));
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

        it('should render loading in bottom', function () {
            const renderError = () => <h1>ERROR</h1>;
            const ac = makeMockedAutoCollection({
                as: EmptyComponent,
                extra: {renderOptions: {renderError: renderError, errorPosition: "bottom"}}
            }, false, "ERROR");
            const renderer = new SimpleCollectionRenderer(ac);
            const rendered = renderer.render();
            const errorComponent = rendered.props.children.props.children[2];
            expect(errorComponent).toEqual(renderError());
            expect(rendered.props.children.props.children).toHaveLength(3);
        });

    });
    

});