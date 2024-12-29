# Web GiveYou UI 和动画设计文档

## 1. UI 设计系统

### 1.1 色彩系统
```css
/* 主色调 */
--primary: #2563eb;      /* 主要按钮、链接 */
--primary-light: #3b82f6; /* 悬停状态 */
--secondary: #8b5cf6;    /* 次要元素 */
--accent: #f59e0b;       /* 强调色 */

/* 中性色 */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-800: #1f2937;
--gray-900: #111827;
```

### 1.2 排版系统
```css
/* 字体系统 */
font-family: Inter, system-ui, -apple-system, sans-serif;

/* 字体大小 */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
```

### 1.3 间距系统
```css
/* 间距比例 */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
```

## 2. 动画效果设计

### 2.1 卡片悬停动画
```typescript
// Framer Motion 动画配置
const cardHoverAnimation = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// 使用示例
<motion.div
  initial="rest"
  whileHover="hover"
  variants={cardHoverAnimation}
>
  {/* 卡片内容 */}
</motion.div>
```

### 2.2 页面转场动画
```typescript
// 页面进入动画
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};
```

### 2.3 列表项动画
```typescript
// 列表项交错动画
const staggerAnimation = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }
};
```

## 3. 交互设计

### 3.1 卡片交互
```typescript
interface CardInteraction {
  // 卡片点击
  onClick: () => void;
  // 卡片展开
  onExpand: () => void;
  // 分享功能
  onShare: () => void;
  // 收藏功能
  onBookmark: () => void;
}
```

### 3.2 手势交互
```typescript
// 滑动手势配置
const swipeConfig = {
  drag: "x",
  dragConstraints: { left: 0, right: 0 },
  dragElastic: 0.7,
  onDragEnd: (e, { offset, velocity }) => {
    const swipe = Math.abs(velocity.x) * offset.x;
    if (swipe < -10000) {
      // 向左滑动动作
    } else if (swipe > 10000) {
      // 向右滑动动作
    }
  }
};
```

## 4. 响应式设计

### 4.1 断点系统
```css
/* Tailwind 断点 */
sm: "640px",   /* 手机横屏 */
md: "768px",   /* 平板竖屏 */
lg: "1024px",  /* 平板横屏 */
xl: "1280px",  /* 桌面显示器 */
2xl: "1536px"  /* 大屏显示器 */
```

### 4.2 网格布局
```css
.grid-layout {
  display: grid;
  gap: 1.5rem;
  
  /* 响应式列数 */
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 5. 特效设计

### 5.1 毛玻璃效果
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### 5.2 渐变效果
```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 100%
  );
}
```

### 5.3 阴影效果
```css
.card-shadow {
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.card-shadow:hover {
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

## 6. 性能优化

### 6.1 动画性能
- 使用 `transform` 和 `opacity` 进行动画
- 避免频繁的布局重计算
- 使用 `will-change` 提示浏览器
- 使用 `requestAnimationFrame` 进行帧动画

### 6.2 渲染优化
- 组件懒加载
- 虚拟滚动列表
- 图片懒加载
- 合理使用 React.memo

## 7. 可访问性

### 7.1 键盘导航
- 清晰的焦点状态
- 合理的 Tab 顺序
- 快捷键支持

### 7.2 屏幕阅读器支持
- ARIA 标签
- 语义化 HTML
- 合适的替代文本

## 8. 主题切换

### 8.1 暗色模式
```css
/* 暗色模式变量 */
:root[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --card-bg: rgba(255, 255, 255, 0.05);
}
```

### 8.2 主题切换动画
```typescript
const themeTransition = {
  transition: 'background-color 0.3s ease, color 0.3s ease',
};
```
