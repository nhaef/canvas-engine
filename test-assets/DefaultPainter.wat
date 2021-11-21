(module
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $none_=>_none (func))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 16392))
 (global $~lib/memory/__heap_base i32 (i32.const 16392))
 (memory $0 0)
 (table $0 1 funcref)
 (elem $0 (i32.const 1))
 (export "init" (func $src/__tests__/engines/default/DefaultPainter.as/init))
 (export "next" (func $src/__tests__/engines/default/DefaultPainter.as/next))
 (export "getLastActionColor" (func $src/__tests__/engines/default/DefaultPainter.as/getLastActionColor))
 (export "getLastActionDirection" (func $src/__tests__/engines/default/DefaultPainter.as/getLastActionDirection))
 (export "memory" (memory $0))
 (func $src/__tests__/engines/default/DefaultPainter.as/init (param $0 i32) (param $1 i32)
  nop
 )
 (func $src/__tests__/engines/default/DefaultPainter.as/next
  nop
 )
 (func $src/__tests__/engines/default/DefaultPainter.as/getLastActionColor (result i32)
  i32.const -16777216
 )
 (func $src/__tests__/engines/default/DefaultPainter.as/getLastActionDirection (result i32)
  i32.const 1
 )
)
