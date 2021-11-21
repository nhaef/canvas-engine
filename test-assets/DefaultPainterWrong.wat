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
 (export "init" (func $test-assets/DefaultPainter.as/init))
 (export "next" (func $test-assets/DefaultPainter.as/next))
 (export "getLastActionColor" (func $test-assets/DefaultPainter.as/getLastActionColor))
 (export "getLastActionDirectionn" (func $test-assets/DefaultPainter.as/getLastActionDirectionn))
 (export "memory" (memory $0))
 (func $test-assets/DefaultPainter.as/init (param $0 i32) (param $1 i32)
  nop
 )
 (func $test-assets/DefaultPainter.as/next
  nop
 )
 (func $test-assets/DefaultPainter.as/getLastActionColor (result i32)
  i32.const -16777216
 )
 (func $test-assets/DefaultPainter.as/getLastActionDirectionn (result i32)
  i32.const 1
 )
)
