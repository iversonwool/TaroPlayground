import React from "react";
import { View } from "@tarojs/components";
import type { ITouchEvent } from "@tarojs/components/types/common";
import { ITouch } from "@tarojs/components/types/common";
import _ from "lodash";
import Taro from "@tarojs/taro";
import "./index.scss";

interface IFloatingWrapperProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: ITouchEvent) => void;
  renderProps?: (top: number, left: number) => React.ReactElement;
}

function useScreen() {
  const [screenInfo, setScreenInfo] = React.useState({
    windowWidth: 0,
    windowHeight: 0,
  });
  React.useLayoutEffect(() => {
    const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
    setScreenInfo({ windowWidth, windowHeight });
  }, []);

  return screenInfo;
}

const FloatingWrapper: React.FC<IFloatingWrapperProps> = (props) => {
  const { onClick, style, className = '', renderProps } = props;
  const [position, setPosition] = React.useState({
    buttonTop: 0,
    buttonLeft: 0,
  });
  const { buttonTop, buttonLeft } = position;
  const startPoint = React.useRef<null | ITouch>(null);
  const screenInfo = useScreen();
  const { windowWidth, windowHeight } = screenInfo;
  const [ball, setBall] = React.useState({ ballWidth: 0, ballHeight: 0 });
  const { ballWidth, ballHeight } = ball;

  function onTouchStart(e: ITouchEvent) {
    startPoint.current = e.touches[0];
  }

  function onTouchMove(e: ITouchEvent) {
    if (!startPoint.current) return;
    const endPoint = e.touches[e.touches.length - 1];
    const translateX = endPoint.clientX - startPoint.current.clientX;
    const translateY = endPoint.clientY - startPoint.current.clientY;
    startPoint.current = endPoint;
    let desButtonTop = buttonTop + translateY;
    let desButtonLeft = buttonLeft + translateX;
    // 判断是移动否超出屏幕
    if (desButtonLeft + ballWidth >= windowWidth) {
      desButtonLeft = windowWidth - ballWidth;
    }
    if (desButtonLeft <= 0) {
      desButtonLeft = 0;
    }
    if (desButtonTop <= 0) {
      desButtonTop = 0;
    }
    if (desButtonTop + ballHeight >= windowHeight) {
      desButtonTop = windowHeight - ballHeight;
    }

    setPosition({
      buttonTop: desButtonTop,
      buttonLeft: desButtonLeft,
    });
  }

  function onTouchEnd() {
    startPoint.current = null;
  }

  React.useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select(".floatingWrapper")
        .boundingClientRect((r) => {
          setBall({
            ballWidth: r.width,
            ballHeight: r.height,
          });
        })
        .exec();
    });
  }, [style?.width, style?.height, className]);

  React.useEffect(() => {
    setPosition({
      buttonTop: windowHeight - 200 - ballHeight,
      buttonLeft: windowWidth - 16 - ballWidth,
    });
  }, [ballWidth, ballHeight]);

  return (
    <View
      className={`floatingWrapper ${className}`}
      style={{
        ...style,
        top: buttonTop,
        left: buttonLeft,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={_.throttle(onTouchMove, 500)} // 节流一下
      onTouchEnd={onTouchEnd}
      catchMove // 防止滚动穿透
      onClick={onClick}
    >
      {renderProps && renderProps(buttonTop, buttonLeft)}
    </View>
  );
};

export default FloatingWrapper;
