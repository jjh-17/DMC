import React from 'react';

export const useDragScroll = (): [(nodeEle: HTMLElement) => void] => {
    const [node, setNode] = React.useState<HTMLElement>(null);

    const ref = React.useCallback((nodeEle: HTMLElement) => {
        setNode(nodeEle);
    }, []);

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!node) {
            return;
        }
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(node);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(node);
        };
    }, [node]);

    const handleTouchStart = React.useCallback((e: React.TouchEvent<HTMLElement>) => {
        if (!node) {
            return;
        }
        const touch = e.touches[0];
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: touch.clientX,
            y: touch.clientY,
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(node);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(node);
        };
    }, [node]);

    const updateCursor = (ele: HTMLElement) => {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
    };

    const resetCursor = (ele: HTMLElement) => {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    React.useEffect(() => {
        if (!node) {
            return;
        }

        node.addEventListener("mousedown", handleMouseDown);
        node.addEventListener("touchstart", handleTouchStart);

        return () => {
            node.removeEventListener("mousedown", handleMouseDown);
            node.removeEventListener("touchstart", handleTouchStart);
        };
    }, [node]);

    return [ref];
};
