// File: mobile/lib/utils/local_db.dart
import 'package:hive/hive.dart';
import 'package:path_provider/path_provider.dart';

class LocalDB {
  static const String _boxName = 'offline_records';
  static bool _initialized = false;

  static Future<void> init() async {
    if (_initialized) return;
    final dir = await getApplicationDocumentsDirectory();
    Hive.init(dir.path);
    await Hive.openBox<Map>(_boxName);
    _initialized = true;
    print('[LocalDB] Hive initialized at ' + dir.path);
  }

  static Future<void> saveRecord(Map<String, dynamic> record) async {
    await init();
    final box = Hive.box<Map>(_boxName);
    await box.put(record['clientRecordId'], record);
  }

  static Future<List<Map>> getUnsyncedRecords() async {
    await init();
    final box = Hive.box<Map>(_boxName);
    final unsynced = box.values.where((r) => r['synced'] == false || r['synced'] == null).toList().cast<Map>();
    return unsynced;
  }

  static Future<void> markAsSynced(List<String> ids) async {
    await init();
    final box = Hive.box<Map>(_boxName);
    for (final id in ids) {
      final record = box.get(id);
      if (record != null) {
        record['synced'] = true;
        await box.put(id, record);
      }
    }
  }

  static Future<void> clearAll() async {
    await init();
    final box = Hive.box<Map>(_boxName);
    await box.clear();
  }
}
